import { FastifyInstance } from 'fastify';

import { authRoutes } from '../routes/auth';
import { accountRoutes } from '../routes/account';
import { mcpRoutes } from '../routes/mcp';
import { storefrontRoutes } from '../routes/storefront';
import { defaultRoutes } from '../routes/default';
import { dataRoutes } from '../routes/datarouter';
import { matchmaker } from '../routes/matchmaker';
import { feedbackRoutes } from '../routes/feedback';
import { versionRoutes } from '../routes/version';
import { cloudstorageRoutes } from '../routes/cloudstorage';
import { lightswitchRoutes } from '../routes/lightswitch';
import { partyRoutes } from '../routes/party';
import { friendRoutes } from '../routes/friends';
import { statsRoutes } from '../routes/stats';
import { eventRoutes } from '../routes/event';
import { contentRoutes } from '../routes/content';
import { receiptRoutes } from '../routes/receipts';
import { waitingroom } from '../routes/waitingroom';
import { legal } from '../routes/legal';

function registerRoutes(fastify: FastifyInstance) {
    defaultRoutes(fastify)
    authRoutes(fastify);
    accountRoutes(fastify);
    mcpRoutes(fastify);
    storefrontRoutes(fastify);
    dataRoutes(fastify);
    matchmaker(fastify);
    feedbackRoutes(fastify);
    versionRoutes(fastify);
    cloudstorageRoutes(fastify);
    lightswitchRoutes(fastify);
    partyRoutes(fastify);
    friendRoutes(fastify);
    statsRoutes(fastify);
    eventRoutes(fastify);
    contentRoutes(fastify);
    receiptRoutes(fastify);
    waitingroom(fastify);
    legal(fastify);
}

export default {
    registerRoutes
}