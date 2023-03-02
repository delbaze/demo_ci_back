import { Resolver, Query, Mutation, Arg } from "type-graphql";
import WilderService from "../services/Wilder";
import Wilder, { CreateWilderInput, WilderListData } from "../entity/Wilder";

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => WilderListData)
  async listWilders(): Promise<WilderListData> {
    let wilders = await new WilderService().listWilders();
    return { wilders, success: true, message: "un message de test" };
  }
  @Query(() => Wilder)
  async findWilder(@Arg("id") id: string): Promise<Wilder | null | void> {
    return await new WilderService().findWilder(id);
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("createWilderInput") createWilderInput: CreateWilderInput
  ): Promise<Wilder> {
    const { first_name, last_name, age } = createWilderInput;
    let wilder = await new WilderService().createWilder({
      first_name,
      last_name,
      age,
    });
    return wilder;
  }
  //   @Mutation(() => Wilder)
  //   async createWilder(
  //     @Arg("first_name") first_name: string,
  //     @Arg("last_name") last_name: string,
  //     @Arg("age") age: number
  //   ): Promise<Wilder> {
  //     let wilder = await new WilderService().createWilder({
  //       first_name,
  //       last_name,
  //       age,
  //     });
  //     return wilder;
  //   }
}
