import {useEffect, useState} from 'react'
import Layout from '../Layout'
import Heading from '../components/Heading'
import PropTypes from 'prop-types';
import useContentful from "../hooks/useContentful"


const Member = ({member}) => {
  const [readMore, setReadMore] = useState(false)
  const handleClickReadMore = () => setReadMore(!readMore)
  return (
    <>
      <div className="w-32 h-32 rounded-full bg-slate-600 absolute right-[41%] -top-16 z-0 opacity-50" />
      <img src={member.picture} className="mx-auto rounded-full w-32 -mt-20 mb-3 text-center z-1 relative" />
      <div className="absolute font-bold mb-2 top-0 rounded-sm  overflow-hidden p-2 left-0 text-xl bg-slate-800 text-white">{member.name}</div>
      <div className="">{readMore ? <div dangerouslySetInnerHTML={{ __html: member.text }} />: <div dangerouslySetInnerHTML={{ __html: member.previewText }} />}<a className="text-slate-500 hover:text-slate-600 transition cursor-pointer" onClick={handleClickReadMore}>{readMore ? 'Weniger anzeigen': 'Mehr anzeigen'}</a></div>
    </>
  )
}

Member.propTypes = {
  member: PropTypes.object
}

function Team() {
  const [teamData, setTeamData] = useState()
  const { getMembers } = useContentful()

  useEffect(() => {
    const getTeamMembers = async() => {
      const data = await getMembers()
      setTeamData(data)
    }
    getTeamMembers()
  },[])

  return (
    <Layout>
      <Heading title="Aktuelles Team" />
      <div className="flex items-start gap-x-5 gap-y-24 mt-24 flex-wrap">
        {teamData?.map((member) => (
          <div key={member.name} className="bg-slate-200 rounded-sm p-3 relative md:flex-[45%] self-stretch">
            <Member member={member} />
          </div>
        ) )}
      </div>
    </Layout>
  )
}

export default Team
