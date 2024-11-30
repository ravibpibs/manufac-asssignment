interface CropData {
    crop: string;
    production: number;
}

interface YearlyCropData {
    Year: string;
    MaxCrop: string;
    MinCrop: string;
}

export const aggregateByYear = (data: any[]): YearlyCropData[] => {
    const result: YearlyCropData[] = [];

    const groupedByYear = data.reduce<Record<string, CropData[]>>((acc, row) => {
        const year = row.Year.replace('Financial Year (Apr - Mar), ', '');
        const production = parseFloat(row['Crop Production (UOM:t(Tonnes))']) || 0;
        const crop = row['Crop Name'];

        if (!acc[year]) acc[year] = [];
        acc[year].push({ crop, production });
        return acc;
    }, {});

    for (const [year, crops] of Object.entries(groupedByYear)) {
        const maxCrop = crops.reduce<CropData>((max, current) =>
            current.production > max.production ? current : max
            , crops[0]);  // Initial value set to the first crop in the list

        const minCrop = crops.reduce<CropData>((min, current) =>
            current.production < min.production ? current : min
            , crops[0]);  // Initial value set to the first crop in the list

        result.push({ Year: year, MaxCrop: maxCrop.crop, MinCrop: minCrop.crop });
    }


    return result;
};

interface CropAverageData {
    Crop: string;
    AvgYield: number;
    AvgArea: number;
}


interface CropValues {
    totalYield: number;
    totalArea: number;
    count: number;
}

export const aggregateByCrop = (data: any[]): CropAverageData[] => {
    const result: CropAverageData[] = [];

    const groupedByCrop = data.reduce<Record<string, CropValues>>((acc, row) => {
        const crop = row['Crop Name'];
        const yieldValue = parseFloat(row['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0;
        const cultivationArea = parseFloat(row['Area Under Cultivation (UOM:Ha(Hectares))']) || 0;

        if (!acc[crop]) acc[crop] = { totalYield: 0, totalArea: 0, count: 0 };

        acc[crop].totalYield += yieldValue;
        acc[crop].totalArea += cultivationArea;
        acc[crop].count += 1;

        return acc;
    }, {});

    // Calculate average yield and area per crop
    for (const [crop, values] of Object.entries(groupedByCrop)) {
        result.push({
            Crop: crop,
            AvgYield: parseFloat((values.totalYield / values.count).toFixed(3)), 
            AvgArea: parseFloat((values.totalArea / values.count).toFixed(3)),  
        });
    }

    return result;
};
