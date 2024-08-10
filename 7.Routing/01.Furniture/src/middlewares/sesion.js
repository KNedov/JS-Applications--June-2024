import{getuserData} from '../../src/util.js'

export function addSession(ctx, next) {
  ctx.user =getuserData()
  next();
}
