import { ZodError } from "zod";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          error: "Validation failed",
          details: errorMessages,
        });
      }
      next(error);
    }
  };
};
