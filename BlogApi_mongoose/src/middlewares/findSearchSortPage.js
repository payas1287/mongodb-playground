"use strict";
/* -------------------------------------------------------
    EXPRESSJS 
------------------------------------------------------- */
// Middleware: Filter Search Sort Pagination

module.exports = async (req, res, next) => {
  //* FILTERING - SEARCHING - SORTING - PAGINATION *//

  const filter = req.query?.filter || {};
  const search = req.query?.search || {};
  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" };
  }
  const sort = req.query?.sort || {};
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20);
  let page = Number(req.query?.page);
  page = page > 0 ? page : 1;
  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : (page - 1) * limit;
  res.getModelList = async function (Model, populate = null) {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate(populate);
  };
  res.getModelListDetails = async function (Model) {
    const data = await Model.find({ ...filter, ...search });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 1 ? page - 1 : false,
        current: page,
        next: page + 1,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    if (details.pages.next > details.pages.total) details.pages.next = false;
    if (details.totalRecords <= limit) details.pages = false;

    return details;
  };

  next();
};
