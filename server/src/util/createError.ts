export default (message: string, status: number) => {
  const error = new Error() as any;
  error.message = message;
  error.status = status;
  return error;
};
