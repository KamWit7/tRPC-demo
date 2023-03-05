import { router, t } from "./../trpc"

export const useRouter = router({
  getUser: t.procedure.query(() => {
    return { id: 1, name: "kamil" }
  }),
})
