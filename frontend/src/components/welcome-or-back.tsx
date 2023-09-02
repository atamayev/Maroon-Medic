import CheckCookie from "src/utils/cookie-check"

export default function WelcomeOrBack () {
	const newUser = CheckCookie.forNewUser("NewUser")

	if (newUser) return <> to MaroonMedic</>
	return <> back</>
}
