import { atom, useAtom } from "jotai"

import { mails } from "@/constants/data"


const configAtom = atom({
  selected: mails[0].id,
})

export function useMail() {
  return useAtom(configAtom)
}