"use client";

import { useState } from "react";
import { Sparkles, Crown, TrendingUp } from "lucide-react";
import { PROFESSIONAL_TEMPLATES, type ThumbnailTemplate } from "@/lib/templates";

interface TemplateBrowserProps {
    onSelectTemplate: (template: ThumbnailTemplate) => void;
}

export default function TemplateBrowser({ onSelectTemplate }: TemplateBrowserProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = [
        { id: 'all', name: 'All Templates', icon: Sparkles },
        { id: 'gaming', name: 'Gaming', icon: TrendingUp },
        { id: 'education', name: 'Education', icon: Crown },
        { id: 'entertainment', name: 'Entertainment', icon: Sparkles },
        { id: 'tech', name: 'Tech', icon: TrendingUp },
        { id: 'lifestyle', name: 'Lifestyle', icon: Crown },
    ];

    const filteredTemplates = selectedCategory === 'all'
        ? PROFESSIONAL_TEMPLATES
        : PROFESSIONAL_TEMPLATES.filter(t => t.category === selectedCategory);

    return (
        <div className="dashboard-card p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Pro Templates</h3>
                <div className="text-sm text-gray-400">
                    {filteredTemplates.length} templates
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredTemplates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onSelectTemplate(template)}
                        className="dashboard-card-hover p-4 text-left space-y-3"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-bold text-lg">{template.name}</h4>
                                <p className="text-sm text-gray-400 mt-1">
                                    {template.description}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <div className="score-excellent text-xs">
                                    {template.avgCTR}% CTR
                                </div>
                                <div className="text-xs text-gray-500 capitalize">
                                    {template.category}
                                </div>
                            </div>
                        </div>

                        {/* Color Preview */}
                        <div className="flex gap-2">
                            <div
                                className="w-8 h-8 rounded-lg border border-white/20"
                                style={{ backgroundColor: template.layout.colorScheme.primary }}
                                title="Primary Color"
                            />
                            <div
                                className="w-8 h-8 rounded-lg border border-white/20"
                                style={{ backgroundColor: template.layout.colorScheme.text }}
                                title="Text Color"
                            />
                            <div
                                className="w-8 h-8 rounded-lg border border-white/20"
                                style={{ backgroundColor: template.layout.colorScheme.shadow }}
                                title="Shadow Color"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
