
function Anchoring(server) {
    require("../../flows/AnchorsManager");

    const { URL_PREFIX } = require('./../constants');
    const AnchorSubrscriptions = require('./subscriptions');
    const AnchorVersions = require('./versions');
    const { addAnchor } = require('./controllers');
    const { responseModifierMiddleware } = require('../../utils/middlewares');

    const storageFolder = path.join(server.rootFolder, 'anchors');
    let storageNotAccessible = false;

    try {
        fs.mkdirSync(storageFolder, { recursive: true });
    } catch {
        storageNotAccessible = true;
    }

    $$.flow.start("AnchorsManager").init(storageFolder);


    server.use(`${URL_PREFIX}/*`, responseModifierMiddleware);

    // if the method is POST why add additinal verb do describe action
    server.post(`${URL_PREFIX}`, addAnchor);

    AnchorVersions(server);
    AnchorSubrscriptions(server);
}

module.exports = Anchoring;
