export const metadata = {
   title: 'Register | Koshunter',
   description: 'UKK SMK Telkom Malang',
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return (
       <div>{children}</div>
   )
}

export default RootLayout
