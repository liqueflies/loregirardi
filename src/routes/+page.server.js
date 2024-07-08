// import {Predicates} from 'prismic-javascript';
import * as Prismic from "@prismicio/client";
import { PRISMIC_ENDPOINT } from '$env/static/private'
const Client = Prismic.createClient(PRISMIC_ENDPOINT);

export async function load() {
  // const { results } = await req.prismic.api.query(
  //   Predicates.at('document.type', 'work'),
  //   { orderings : '[my.work.release desc]' }
  // );

  // res.writeHead(200, {
  //   "Content-Type": "application/json"
  // });

  // res.end(JSON.stringify({ results }));
  // return results;

  return {
    posts: await Client.getAllByType("work", {
      // orderings: "[my.work.release desc]",
    })
  }
}