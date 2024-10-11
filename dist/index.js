"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const formbody_1 = __importDefault(require("@fastify/formbody"));
const router_1 = __importDefault(require("./src/utils/router"));
const fastify = (0, fastify_1.default)({ logger: { level: 'warn' } });
const IP = "0.0.0.0";
const PORT = 3551;
fastify.register(formbody_1.default);
fastify.addHook('onResponse', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    if (reply.statusCode >= 400) {
        fastify.log.info(`Response with status code: ${reply.statusCode} for ${request.method} ${request.url}`);
    }
}));
fastify.setNotFoundHandler((request, reply) => {
    console.log(`404 Not Found: ${request.method} : ${request.url}`);
    reply
        .status(404)
        .send({
        error: 'arcane.errors.common.not_found',
        message: 'The route you requested is either unavailable or missing!',
        code: 404
    });
});
router_1.default.registerRoutes(fastify);
function startHTTPServer() {
    try {
        fastify.listen({ port: PORT, host: IP });
        console.log(`Arcane Listening On: http://${IP}:${PORT}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
function startBackend() {
    startHTTPServer();
}
startBackend();
