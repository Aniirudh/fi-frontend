// frontend/app/type_2_home/page.jsx
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getProfileData() {
    const token = await cookies().get('token')?.value;
    console.log('Fetching profile data... Token:', token);
    if (!token) {
        redirect('/');
    }
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`,
            },
        });
        console.log('Profile Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Profile Error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            redirect('/');
        }
        return { error: 'Failed to fetch profile data' };
    }
}

export default async function Type2Home() {
    const profileData = await getProfileData();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Type 2 User Dashboard</h1>
                <p className="text-gray-600 mb-6">Welcome to your personalized Type 2 dashboard.</p>
                {profileData.error ? (
                    <p className="text-red-500 text-sm">{profileData.error}</p>
                ) : (
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-lg font-medium text-gray-700">User Type: <span className="text-green-600">{profileData.user_type}</span></p>
                        <p className="text-gray-600 mt-2">This dashboard is tailored for Type 2 users, providing access to exclusive features.</p>
                    </div>
                )}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800">Feature 1</h3>
                        <p className="text-gray-600">Access your Type 2 analytics and insights.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800">Feature 2</h3>
                        <p className="text-gray-600">Manage your Type 2 settings and preferences.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}