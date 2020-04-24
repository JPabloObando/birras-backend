const test = async (parent, args, ctx, info) => {
  const users = await ctx.db.query("SELECT * FROM public.user");

  console.log("users ", users);

  return "Here we going";
};

module.exports = {
  test,
};
