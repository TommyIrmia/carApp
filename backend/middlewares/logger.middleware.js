import { loggerService } from "../services/logger.service.js"

export function log(req, res, next) {
    // console.log('req', req._parsedOriginalUrl.pathname)

    loggerService.info('Got request : ' + req._parsedOriginalUrl.pathname)
    next()
}