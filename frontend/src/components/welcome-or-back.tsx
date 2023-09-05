import CheckCookie from "src/utils/cookie-check"

export default function WelcomeOrBack () {
	//Find another way to check if user is new. New user cookie is deleted
	const newUser = CheckCookie.forNewUser("NewUser")

	if (newUser) return <> to MaroonMedic</>
	return <> back</>
}
