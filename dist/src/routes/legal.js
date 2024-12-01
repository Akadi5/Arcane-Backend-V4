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
Object.defineProperty(exports, "__esModule", { value: true });
exports.legal = legal;
function legal(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        const eulaData = [
            {
                id: "ArcaneV4",
                locale: "en",
                text: "End User License Agreement for ArcaneV4 - Version 1.0"
            },
        ];
        fastify.get("/eulatracking/api/shared/agreements/fn", (request, reply) => {
            reply.status(200).send(eulaData);
        });
        fastify.get("/eulatracking/api/public/agreements/fn/account/:accountId", (request, reply) => {
            reply.status(204).send();
        });
    });
}