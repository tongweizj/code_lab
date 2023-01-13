const Koa = require("koa");
const Router = require("@koa/router");

const { PrismaClient } = require("@prisma/client");

const { koaBody } = require("koa-body");

const app = new Koa();
const router = new Router();

const prisma = new PrismaClient();

app.use(koaBody());

router.get("/users", async (ctx) => {
  const users = await prisma.users.findMany();

  ctx.body = users;
});

router.get("/users/add/json", async (ctx) => {
  const json = [{ name: "Bob the dog" }, { name: "Claudine the cat" }]; //as Prisma.JsonArray
  const jsonT = { name: "Bob the dog" };
  const createUser = await prisma.users.create({
    data: {
      username: "bir",
      password: "1123",
      admin: true,
      extendedPetsData: jsonT,
    },
  });
  ctx.body = createUser;
});

router.get("/json/users/find", async (ctx) => {
  const user = await prisma.users.findFirst({
    where: {
      username: "bir",
    },
  });

  // Example extendedPetsData data:
  // [{ name: 'Bob the dog' }, { name: 'Claudine the cat' }]
  let petsObject;
  if (user?.extendedPetsData && typeof user?.extendedPetsData === "object") {
    //&& Array.isArray(user?.extendedPetsData);
    petsObject = user?.extendedPetsData; //as Prisma.JsonArray
    console.log(user?.extendedPetsData);
    // const firstPet = petsObject[0];
  }
  ctx.body = petsObject;
});
router.get("/movies", async (ctx) => {
  const post = await prisma.movies.findMany({});

  ctx.body = post;
});
router.get("/op/pi", async (ctx) => {
  const post = await prisma.op_pond_pi_env.findMany({});
  console.log(post);
  const data = [];
  const replacer = (key, value) =>
    key === "create_at" ? Number(value) : value;
  console.time("xx");
  post.forEach((item) => {
    const parsed = JSON.stringify(item, replacer);
    data.push(parsed);
  });
  console.timeEnd("xx");
  ctx.body = data;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-koa#using-the-rest-api`)
);
