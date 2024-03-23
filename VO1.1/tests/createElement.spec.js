import React from '../core/React';
import {it , expect, describe } from 'vitest'

describe("createElement", () => {
    it ("props is null", () => {
        const el = React.createElement("div", null, "hi");

        expect(el).toEqual({
            type: "div",
            props: {
                children: [
                    {
                        type: "TEXT_ELEMENT",
                        props: {
                            nodeValue: "hi",
                            children: []
                        }
                    }
                ]
            }
        })
    })

    it ("Should return vdom for element", () => {
        const el = React.createElement("div", {id: "id"}, "hi");
        // 输出函数名，保存文件后自动生成快照参数
        expect(el).toMatchInlineSnapshot(`
          {
            "props": {
              "children": [
                {
                  "props": {
                    "children": [],
                    "nodeValue": "hi",
                  },
                  "type": "TEXT_ELEMENT",
                },
              ],
              "id": "id",
            },
            "type": "div",
          }
        `)
    })
})