import Image from 'next/image'

import logo from '../../assets/logo.svg'
import InviteLinkInput from './invite-link-input'
import Ranking from './ranking'
import Stats from './stats'

export default function InvitePage() {
  const inviteLink = 'http://localhost:3000/invite/123'

  return (
    <div className="min-h-dvh flex items-center justify-between gap-16 flex-col md:flex-row">
      <div className="flex flex-col gap-10 w-full max-w-[550px]">
        <Image src={logo} alt="devstage" width={108.5} height={30} />

        <div className="space-y-2">
          <h1 className="text-4xl flnt-semibold font-heading text-gray-100 leading-none ">
            Inscrição confirmada
          </h1>
          <p className="text-gray-300">
            Para entrar no envento, clique no link enviado para o seu email
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
          <Stats />
        </div>
      </div>
      <Ranking />
    </div>
  )
}
