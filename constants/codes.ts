export const validCodes = {
    opesGuest: ['TOforeverOG25', 'VIP456', 'VIP789'],
    tolusGuest: ['TOforeverTG25', 'REG456', 'REG789'],
    osibemekunFamilyGuest: ['TOforeverOsi25', 'FAM456', 'FAM789'],
    oyediranFamilyGuest: ['TOforeverOyed25', 'FRI456', 'FRI789'],
    bridalParty: ['TOforeverBP25']
  };
  
  export type UserType = keyof typeof validCodes;
  