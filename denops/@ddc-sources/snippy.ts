import {
  BaseSource,
  DdcGatherItems,
} from "https://deno.land/x/ddc_vim@v3.1.0/types.ts#^";
import { GatherArguments } from "https://deno.land/x/ddc_vim@v3.1.0/base/source.ts";

export class Source extends BaseSource<{}> {
  private counter = 0;
  async gather(
    args: GatherArguments<{}>,
  ): Promise<DdcGatherItems> {
    this.counter = (this.counter + 1) % 100;

    const result = await args.denops.call(
      "luaeval",
      "require('snippy').get_completion_items()",
      {},
    ) as [];

    if (result?.length == null) {
      return [];
    }

    return result;
  }

  params(): {} {
    return {};
  }
}
