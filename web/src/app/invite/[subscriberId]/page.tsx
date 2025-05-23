import Image from 'next/image'

import logo from '../../../assets/logo.svg'
import InviteLinkInput from './invite-link-input'
import Ranking from './ranking'
import Stats from './stats'

interface InvitePageProps {
  // in next the params are a promise
  params: Promise<{
    subscriberId: string,
  }>
  searchParams:Promise<{
    name: string,
  }>
}

export default async function InvitePage(props: InvitePageProps) {
  const { subscriberId } = await props.params // NOTE: this props.params is only available for page.tsx files
  const { name } = await props.searchParams 
  
  const inviteLink = `${process.env.API_URL}/invites/${subscriberId}`;

  return (
    <div className="min-h-dvh flex items-center justify-between gap-16 flex-col md:flex-row">
      <div className="flex flex-col gap-10 w-full max-w-[550px]">
        <Image src={logo} alt="devstage" width={108.5} height={30} />

        <div className="space-y-2">
          <h1 className="text-4xl flnt-semibold font-heading text-gray-100 leading-none ">
            {`Inscrição confirmada - ${name}`}
          </h1>
          <p className="text-gray-300">
            Para entrar no evento, clique no link enviado para o seu email
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
              Recomende e ganhe
            </h2>
            <p>
              Convide mais pessoas para o evento e concorra a prémios
              exclusivos! É só partilhar o link abaixo e acompanhar as
              incrições:
            </p>
          </div>
          <InviteLinkInput inviteLink={inviteLink} />
          <Stats subscriberId={subscriberId} />
        </div>
      </div>
      <Ranking />
    </div>
  )
}
