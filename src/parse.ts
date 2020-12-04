import { Args, parse } from "https://deno.land/std@0.79.0/flags/mod.ts";

export function parse (command:string, opts={}): Args {
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
  return parse(parsed, opts);
}