import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {ChevronDown, LogOut, Plus} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const AppLayout = ({children}) => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/">
                                <h1 className="text-xl font-bold cursor-pointer">Quản lý tài chính</h1>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Dropdown cho "New" */}
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <Button variant="ghost" className="flex items-center">
                                        New <ChevronDown className="w-4 h-4 ml-2"/>
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                    className="min-w-[150px] bg-white border border-gray-200 rounded-md shadow-lg flex flex-col items-start">
                                    <DropdownMenu.Item
                                        className="p-2 hover:bg-gray-100 cursor-pointer w-full text-left"
                                        onClick={() => navigate('/new-transaction')}
                                    >
                                        <Plus className="w-4 h-4 mr-2 inline-block"/>
                                        Tạo mới giao dịch
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <Button
                                variant="ghost"
                                className="flex items-center text-red-500"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('fullName');
                                    navigate('/login');
                                }}
                            >
                                <LogOut className="w-4 h-4 mr-2"/>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;