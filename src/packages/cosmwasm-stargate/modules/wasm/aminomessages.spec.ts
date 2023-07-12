/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toBase64, toUtf8 } from "../encoding";
import { AminoTypes, coins } from "../stargate";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgInstantiateContract2,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { AccessType } from "cosmjs-types/cosmwasm/wasm/v1/types";
import Long from "long";

import {
  AminoMsgClearAdmin,
  AminoMsgExecuteContract,
  AminoMsgInstantiateContract,
  AminoMsgInstantiateContract2,
  AminoMsgMigrateContract,
  AminoMsgStoreCode,
  AminoMsgUpdateAdmin,
  createWasmAminoConverters,
} from "./aminomessages";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgStoreCode", () => {
      const msg: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        instantiatePermission: undefined,
      };
      const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: msg,
      });
      const expected: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
          instantiate_permission: undefined,
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgStoreCode with access type", () => {
      const msg: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        instantiatePermission: {
          permission: AccessType.ACCESS_TYPE_ONLY_ADDRESS,
          address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          addresses: [],
        },
      };
      const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: msg,
      });
      const expected: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
          instantiate_permission: {
            permission: "OnlyAddress",
            address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            addresses: undefined,
          },
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgInstantiateContract", () => {
      // With admin
      {
        const msg: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          msg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "ucosm"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        };
        const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
          typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
          value: msg,
        });
        const expected: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            msg: { foo: "bar" },
            funds: coins(1234, "ucosm"),
            admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          },
        };
        expect(aminoMsg).toEqual(expected);
      }

      // Without admin
      {
        const msg: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          msg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "ucosm"),
          admin: "",
        };
        const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
          typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
          value: msg,
        });
        const expected: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            msg: { foo: "bar" },
            funds: coins(1234, "ucosm"),
            admin: undefined,
          },
        };
        expect(aminoMsg).toEqual(expected);
      }
    });

    it("works for MsgInstantiateContract2", () => {
      // With admin
      {
        const msg: MsgInstantiateContract2 = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          msg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "ucosm"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          salt: toUtf8("salt"),
          fixMsg: false,
        };
        const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
          typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract2",
          value: msg,
        });
        const expected: AminoMsgInstantiateContract2 = {
          type: "wasm/MsgInstantiateContract2",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            msg: { foo: "bar" },
            funds: coins(1234, "ucosm"),
            admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
            salt: toBase64(toUtf8("salt")),
            fix_msg: false,
          },
        };
        expect(aminoMsg).toEqual(expected);
      }

      // Without admin
      {
        const msg: MsgInstantiateContract2 = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          msg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "ucosm"),
          admin: "",
          salt: toUtf8("salt"),
          fixMsg: false,
        };
        const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
          typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract2",
          value: msg,
        });
        const expected: AminoMsgInstantiateContract2 = {
          type: "wasm/MsgInstantiateContract2",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            msg: { foo: "bar" },
            funds: coins(1234, "ucosm"),
            admin: undefined,
            salt: toBase64(toUtf8("salt")),
            fix_msg: false,
          },
        };
        expect(aminoMsg).toEqual(expected);
      }
    });

    it("works for MsgUpdateAdmin", () => {
      const msg: MsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
        typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin",
        value: msg,
      });
      const expected: AminoMsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgClearAdmin", () => {
      const msg: MsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
        typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin",
        value: msg,
      });
      const expected: AminoMsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgExecuteContract", () => {
      const msg: MsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toUtf8(`{"foo":"bar"}`),
        funds: coins(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: msg,
      });
      const expected: AminoMsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: { foo: "bar" },
          funds: coins(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgMigrateContract", () => {
      const msg: MsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        msg: toUtf8(`{"foo":"bar"}`),
      };
      const aminoMsg = new AminoTypes(createWasmAminoConverters()).toAmino({
        typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract",
        value: msg,
      });
      const expected: AminoMsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          msg: { foo: "bar" },
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgStoreCode", () => {
      const aminoMsg: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
        },
      };
      const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        instantiatePermission: undefined,
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: expectedValue,
      });
    });

    it("works for MsgStoreCode with access type", () => {
      const aminoMsg: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
          instantiate_permission: {
            permission: "OnlyAddress",
            address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            addresses: undefined,
          },
        },
      };
      const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        instantiatePermission: {
          permission: AccessType.ACCESS_TYPE_ONLY_ADDRESS,
          address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          addresses: [],
        },
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: expectedValue,
      });
    });

    it("works for MsgInstantiateContract", () => {
      // With admin
      {
        const aminoMsg: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            msg: { foo: "bar" },
            funds: coins(1234, "ucosm"),
            admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          },
        };
        const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
        const expectedValue: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          msg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "ucosm"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        };
        expect(msg).toEqual({
          typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
          value: expectedValue,
        });
      }

      // Without admin
      {
        const aminoMsg: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            msg: { foo: "bar" },
            funds: coins(1234, "ucosm"),
          },
        };
        const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
        const expectedValue: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          msg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "ucosm"),
          admin: "",
        };
        expect(msg).toEqual({
          typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
          value: expectedValue,
        });
      }
    });

    it("works for MsgUpdateAdmin", () => {
      const aminoMsg: AminoMsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgClearAdmin", () => {
      const aminoMsg: AminoMsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgExecuteContract", () => {
      const aminoMsg: AminoMsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: { foo: "bar" },
          funds: coins(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toUtf8(`{"foo":"bar"}`),
        funds: coins(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: expectedValue,
      });
    });

    it("works for MsgMigrateContract", () => {
      const aminoMsg: AminoMsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          msg: { foo: "bar" },
        },
      };
      const msg = new AminoTypes(createWasmAminoConverters()).fromAmino(aminoMsg);
      const expectedValue: MsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        msg: toUtf8(`{"foo":"bar"}`),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract",
        value: expectedValue,
      });
    });
  });
});
