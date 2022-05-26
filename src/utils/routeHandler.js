export const routeHandler = (controller) => {
    return (req, res, next) => controller(req, res).catch(next)
}