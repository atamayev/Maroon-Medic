import _ from "lodash"
import { useContext, useState, useEffect } from "react"
import ServicesMap from "./services-map"
import OpenCloseServiceCategory from "./open-close-service-category"
import { AppContext } from "src/contexts/maroon-context"
import { observer } from "mobx-react"

type CategoriesType = {
	[key: string]: ServiceListItem[]
}

interface Props {
	expandedCategories: string[]
	setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
	setServicesConfirmation: (conf: ConfirmationMessage) => void
}

function ServiceList (props: Props) {
	const { expandedCategories, setExpandedCategories, setServicesConfirmation } = props
	const { doctorLists } = useContext(AppContext)
	const [categories, setCategories] = useState<CategoriesType>({})

	useEffect(() => {
		if (_.isNull(doctorLists) || _.isEmpty(doctorLists.pets)) return
		setCategories(_.groupBy(doctorLists.servicesAndCategories, "categoryName"))
	}, [doctorLists])

	return (
		<>
			{Object.entries(categories).map(([category, services]) => (
				<div key = {category} style = {{ marginBottom: "10px" }}>
					<label htmlFor = {category}>{category}</label>
					<OpenCloseServiceCategory
						category = {category}
						services = {services}
						expandedCategories = {expandedCategories}
						setExpandedCategories = {setExpandedCategories}
					/>
					<ServicesMap
						category = {category}
						services = {services}
						expandedCategories = {expandedCategories}
						setServicesConfirmation = {setServicesConfirmation}
					/>
				</div>
			))}
		</>
	)
}

export default observer(ServiceList)
