import React from 'react';
import { Gamepad2, Trophy, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 'game', label: 'Game', IconComponent: Gamepad2 },
        { id: 'scores', label: 'Scores', IconComponent: Trophy },
        { id: 'admin', label: 'Admin', IconComponent: Settings },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 py-3 px-6 flex justify-around items-center z-50">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.IconComponent;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center gap-1 transition cursor-pointer ${
                            isActive ? 'text-purple-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs">{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}