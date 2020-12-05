import * as std from "https://deno.land/std@0.79.0/flags/mod.ts";

/**
 * Parse command string into std Args.
 * @param {string} command - original command for parse
 * @param {std.ArgParsingOptions} opts - options to pass std.parse
 * @return {std.Args}
 */
export function parse (command:string, opts={}): std.Args {
  let splited:string[] = command.split(' ');
  let parsed:string[] = [];
  let data:string = "";
  let isLong:boolean = false;

  for(var curr of splited){
    if (!isLong && curr === '') continue;
    if (curr.substr(0,1) === '\"')
      isLong = true;
    if (isLong) {
      data += ' ' + curr;
      if (curr.substr(-1) === '\"' && curr.substr(-2,1) !== '\\') {
        isLong = false;
        data = data.replaceAll('\\\"', '\"').substr(2,data.length-3);
        parsed.push(data);
      }
    } else {
      parsed.push(curr);
    }
  }
  return std.parse(parsed, opts);
}

/**
 * Set alias to args.
 * @param {std.Args} args - original args
 * @return {std.Args}
 */
export function reAlias (args:std.Args,
  alias:Record<string, string | string[]> = {}): std.Args{

  for (var v in alias) {
    let target:string[] = [];
    if (typeof alias[v] === "string") target = [alias[v]] as string[];
    else target = alias[v] as string[];

    for (var k of target){
      if (!(k in args)) continue;
      args[v] = args[k];
      delete args[k];
    }
  }

  return args;
}