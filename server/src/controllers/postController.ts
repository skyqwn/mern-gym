import { NextFunction, Request, Response } from "express";

const create = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    console.log(body);
    return res.status(200).json({ messge: "hi" });
  } catch (error) {
    return next(error);
  }
};

export default { create };
