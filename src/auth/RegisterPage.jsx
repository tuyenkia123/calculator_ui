import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Lock} from 'lucide-react';
import {authService} from "../service/auth.js";
import toast from "react-hot-toast";

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        fullName: '',
        username: '',
        password: '',
        rePassword: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.register((credentials));
            if (response.username) {
                toast.success('Đăng ký tài khoản thành công', {
                    duration: 4000,
                    style: {
                        background: '#4BB543',
                        color: '#fff'
                    }
                })
                navigate('/login');
            }
        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2"/>
                        Đăng ký
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tên đầy đủ *</label>
                            <Input
                                type="text"
                                value={credentials.fullName}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    fullName: e.target.value
                                })}
                                required
                            />
                        </div>
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
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Xác nhận mật khẩu *</label>
                            <Input
                                type="password"
                                value={credentials.rePassword}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    rePassword: e.target.value
                                })}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Đăng ký
                        </Button>
                    </form>
                    <button>
                        <a onClick={() => navigate('/login')}>Bạn đã có tài khoản? Đăng nhập</a>
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;