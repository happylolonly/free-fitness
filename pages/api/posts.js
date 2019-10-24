import { VK } from "vk-io";

const vk = new VK({
  token:
    process.env.TOKEN ||
    "4e82e2084e82e2084e82e208a74ee4c61044e824e82e208151f9677d3d62856454ed2e6"
});

async function run(search) {
  const response = await vk.api.wall.search({
    domain: "free_fitness_minsk",
    query: search,
    count: 30
  });

  return response;
}

async function get() {
  const response = await vk.api.wall.get({
    domain: "free_fitness_minsk",
    //   query: search,
    count: 30
  });

  return response;
}

export default async (req, res) => {
  const { search } = req.query;
  const t = search ? await run(search) : await get();
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.send(JSON.stringify(t));
};
