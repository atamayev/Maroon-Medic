import { observer } from "mobx-react"
import { useContext, useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import DoctorHeader from "../doctor-header"
import PetsSection from "./pets"
import ServiceSection from "./service"
import LanguageSection from "./language"
import LocationSection from "./location"
import SpecialtySection from "./specialty"
import VetEducationSection from "./vet-education"
import DescriptionSection from "./description"
import PublicStatusSection from "./public-status"
import VerificationSection from "./verification-status"
import PreVetEducationSection from "./pre-vet-education"
import PersonalInfoLinkSection from "./personalInfoLink"
import useSetDoctorAccountDetails from "src/custom-hooks/account-details/use-set-doctor-account-details"
import { AppContext } from "src/contexts/maroon-context"

function DoctorAccountDetails() {
	const appContext = useContext(AppContext)

	const [expandedCategories, setExpandedCategories] = useState<string[]>([])

	const [expandedPetTypes, setExpandedPetTypes] = useState<string[]>([])

	useSetDoctorAccountDetails(setExpandedCategories)

	if (appContext.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<div>
			<DoctorHeader/>

			<PreVetEducationSection	/>
			<VetEducationSection />
			<DescriptionSection />
			<PersonalInfoLinkSection/>
			<PetsSection
				expandedPetTypes = {expandedPetTypes}
				setExpandedPetTypes = {setExpandedPetTypes}
			/>
			<SpecialtySection />
			<LanguageSection />
			<ServiceSection
				expandedCategories = {expandedCategories}
				setExpandedCategories = {setExpandedCategories}
			/>
			<LocationSection />
			<PublicStatusSection />
			<VerificationSection />
		</div>
	)
}

export default observer(DoctorAccountDetails)
