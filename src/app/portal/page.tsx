import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const PortalPage = () => {
    const cookieStore = cookies();
    if (cookieStore.get('role')?.value == "educator") {
        redirect('/portal/educator')
    } else {
        redirect('/portal/parent')
    }
    return (
    null
    )
}

export default PortalPage