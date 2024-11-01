import NextAuth from "next-auth"
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME ?? '',
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID ?? '',
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET ?? '',
      authorization: { params: { scope: "offline_access openid" } },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }