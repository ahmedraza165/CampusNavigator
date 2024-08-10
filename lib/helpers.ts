export const base_url = process.env.BASE_API_URL;



export const getRemainingTrialDays = (endDate: any) => {
    const trialEnd = new Date(endDate);
    const currentDate = new Date();

    // Calculate the difference in milliseconds between trial end and current date
    const timeDiff = trialEnd.getTime() - currentDate.getTime();

    // Calculate the difference in days and round down using Math.floor()
    const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return remainingDays <= 0 ? 0 : remainingDays;
};



