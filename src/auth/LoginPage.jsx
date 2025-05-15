import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Lock} from 'lucide-react';
import {authService} from "../service/auth.js";

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login((credentials));
            if (response.token) {
                localStorage.setItem('token', response.token);
                console.log('username', response.userInfo.username)
                localStorage.setItem('username', response.userInfo.username);
                localStorage.setItem('fullName', response.userInfo.fullName);
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2"/>
                        Quản lý tài chính
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tài khoản *</label>
                            <Input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    username: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Mật khẩu *</label>
                            <Input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    password: e.target.value
                                })}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Đăng nhập
                        </Button>
                    </form>
                    <button>
                        <a onClick={() => navigate("/register")}>Bạn chưa có tài khoản? Đăng ký</a>
                    </button>

                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;