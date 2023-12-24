import { useEffect, useState } from "react";
import Heading from "../Heading";
import PropTypes from "prop-types";
import useContentful from "../../hooks/useContentful";
import Modal, { ModalTitle } from "../Modal";
import VoteIcon from "../../assets/vote.png";

const Member = ({ member, isEmpty }) => {
  if (isEmpty) {
    return (
      <>
        <div className="flex-shrink-0 mx-auto w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mb-3 relative max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none">
          <div
            className="w-full h-full rounded-full overflow-hidden flex-shrink-0 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('/member_unknown.png')` }}
          />
        </div>

        <div className="text-center font-bold text-sm whitespace-nowrap">
          Nicht nominiert
        </div>
      </>
    );
  }
  return (
    <>
      {member.picture ? (
        <div className="flex-shrink-0 mx-auto rounded-full text-center relative mb-3 w-28 h-28 max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none overflow-hidden flex items-center">
          <div
            className="w-full h-full rounded-full overflow-hidden flex-shrink-0 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${member.picture}?w=200')` }}
          />
        </div>
      ) : (
        <div className="mx-auto w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mb-3 relative max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none">
          <img src={VoteIcon} className="w-12" />
        </div>
      )}
      {member.role && (
        <div className="absolute top-3 bg-stone-100 border-2 border-amber-500 z-1 rounded-full w-8 h-8 text-md flex items-center justify-center">
          {member.role}
        </div>
      )}
      <div className="text-sm text-center font-bold">{member.name}</div>
    </>
  );
};

Member.propTypes = {
  member: PropTypes.object,
};

const MIN_MEMBERS_TO_SHOW = {
  Eurobowl: 9,
  "Eur'Open": 5,
};

function Team() {
  const [teamData, setTeamData] = useState();
  const [teamSection, setTeamSection] = useState("Eurobowl");
  const [modalContent, setModalContent] = useState();
  const { getTeam } = useContentful();

  useEffect(() => {
    const getTeamMembers = async () => {
      const data = await getTeam();
      // preload images

      Object.keys(data).forEach((sectionKey) => {
        data[sectionKey].forEach((member) => {
          // section.forEach((member) => {
          new Image().src = member.picture;
          // });
        });
      });
      setTeamData(data);
    };
    getTeamMembers();
  }, []);

  const RoleIcon = ({ role }) => {
    if (!role) return null;
    return (
      <div className="absolute left-0 top-0 bg-stone-100 border-2 border-amber-500 z-1 rounded-full w-8 h-8 text-md flex items-center justify-center z-1">
        {role}
      </div>
    );
  };

  const handleReadMore = (member) => {
    setModalContent(
      <div>
        <ModalTitle title={member.name} />

        <div className="flex items-center mt-10">
          {member.picture ? (
            <div
              className="w-32 h-32 rounded-full mr-5 md:mr-4 flex-shrink-0 bg-cover bg-no-repeat bg-center relative"
              style={{ backgroundImage: `url('${member.picture}?w=200')` }}
            >
              <RoleIcon role={member.role} />
            </div>
          ) : (
            <div className="w-32 h-32 bg-stone-800 flex items-center justify-center flex-shrink-0 rounded-full mr-4 mt-[10px] sm:mt-0 relative">
              <img src={VoteIcon} className="w-16" />
              <RoleIcon role={member.role} />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: member.textNextToImage }}
            className="text-sm md:text-base"
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: member.text }}
          className="mt-3 text-sm md:text-base"
        />
      </div>
    );
  };

  if (!teamData) {
    return null;
  }

  const hasMoreTeamSections = Object.keys(teamData)?.length > 1;

  return (
    <section
      id="team"
      className="relative pb-8 px-2 md:px-10 pt-16 md:pb-16 md:pt-20 bg-stone-900 -mx-4 sm:-mx-10 bg-[url('/bg_team_mobile.png')] sm:bg-[url('/bg_team.png')] bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundSize: "100% 100%",
      }}
    >
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <div className="text-white text-center -mt-5">
        <Heading title="Aktuelles Team" />
        {hasMoreTeamSections && (
          <div className="pb-4 text-sm -mt-3">
            {["Eurobowl", "Eur'Open", "Support"].map((key, index) => (
              <span
                className={`link py-2 px-4 ${
                  teamSection === key || (index === 0 && !teamSection)
                    ? "border-b-2 border-red-600 !text-stone-100 hover:!text-white"
                    : "!text-stone-100 hover:!text-white opacity-90"
                }`}
                onClick={() => setTeamSection(key)}
                key={key}
              >
                {key}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="overflow-x-auto overflow-y-hidden px-5 md:px-0 pt-3 pb-6 sm:py-6 scrollbar-transparent">
        <div className="flex items-center w-full">
          <div className="mx-auto flex gap-x-3 sm:gap-x-5 gap-y-24">
            {teamData[teamSection]?.map((member) => (
              <div
                key={member.name}
                className="p-2 sm:p-3 relative bg-stone-200 rounded-md transform hover:scale-110 transition cursor-pointer flex-1 max-w-[150px]"
                onClick={() => handleReadMore(member)}
              >
                <Member member={member} />
              </div>
            ))}

            {teamData[teamSection]?.length &&
              teamData[teamSection].length < MIN_MEMBERS_TO_SHOW[teamSection] &&
              Array(
                ...Array(
                  MIN_MEMBERS_TO_SHOW[teamSection] -
                    teamData[teamSection]?.length
                ).keys()
              ).map((index) => {
                return (
                  <div
                    key={`emptyMember${index}`}
                    className="p-2 sm:p-3 relative bg-stone-200 rounded-md flex-1 max-w-[140px] self-stretch opacity-80"
                  >
                    <Member isEmpty={true} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
