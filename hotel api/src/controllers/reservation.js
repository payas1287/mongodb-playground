"use strict";

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const Reservation = require("../models/reservation");
const Room = require("../models/room");
const sendMail = require("../middlewares/sendMail");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    //Çoklu populate  ["userId", "pizzaId"]
    //tekli populate "userId"
    const data = await res.getModelList(Reservation, {}, ["userId", "roomId"]);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Reservation),
      data,
    });
  },

  //CRUD
  create: async (req, res) => {
    /*
    #swagger.tags = ["Reservations"]
    #swagger.summary = "Create Reservations"
    */

    //? Converted to date milliseconds
    const arrivalDate = new Date(req.body.arrival_date); // new Date("2021-09-01")
    const departureDate = new Date(req.body.departure_date);

    //? If the arrival date is greater than or equal to the departure date, return an error.
    if (arrivalDate >= departureDate) {
      return res.status(400).send({
        error: true,
        message: "Arrival date must be before departure date.",
      });
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    req.body.night = Math.round(departureDate - arrivalDate) / oneDay;
    req.body.userId = req.user._id;

    //room un bilgilerini al
    const { price } = await Room.findOne(
      { _id: req.body.roomId },
      "price -_id "
    );

    req.body.totalprice = req.body.night * price;
    req.body.price = price;
    // console.log(req.body);

    const data = await Reservation.create(req.body);

    const populatedData = await data.populate(["userId", "roomId"]);
    console.log(populatedData);
    if (populatedData) {
      const subject = "Welcome to My World";
      const htmlContent = `
    <h1>Welcome</h1>
    <h2>Dear ${populatedData.userId.username},</h2>
    <p>Thank you for making a reservation with us. We're excited to have you on board!</p>
    <p>Your stay details:</p>
    <ul>
      <li>Room: ${populatedData.roomId._id}</li>
      <li>Arrival Date: ${populatedData.arrival_date}</li>
      <li>Departure Date: ${populatedData.departure_date}</li>
      <li>Guests: ${populatedData.guest_number}</li>
      <li>Total Price: $${populatedData.totalprice}</li>
    </ul>
    <p>If you have any questions, feel free to reach out to us.</p>
    <p>Best regards,</p>
    <p>The Team</p>`;
      sendMail(populatedData.userId.email, subject, htmlContent);
    }

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservations"
        */
    const data = await Reservation.findOne({ _id: req.params.id }).populate([
      "userId",
      "roomId",
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservations"
        */

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
