export const chanceCards = [
  {
    id: 1,
    text: "Advance to GO. Collect $200.",
    action: "move",
    value: 0
  },
  {
    id: 2,
    text: "Advance to Bondi Beach. If you pass GO, collect $200.",
    action: "move",
    value: 1
  },
  {
    id: 3,
    text: "Advance to Darlinghurst. If you pass GO, collect $200.",
    action: "move",
    value: 39
  },
  {
    id: 4,
    text: "Advance to the nearest Station. If unowned, you may buy it from the Bank. If owned, pay owner twice the rental.",
    action: "nearest",
    value: "railroad"
  },
  {
    id: 5,
    text: "Advance to the nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner 10 times the amount thrown.",
    action: "nearest",
    value: "utility"
  },
  {
    id: 6,
    text: "Bank pays you dividend of $50.",
    action: "collect",
    value: 50
  },
  {
    id: 7,
    text: "Get Out of Jail Free.",
    action: "getOutOfJail",
    value: 0
  },
  {
    id: 8,
    text: "Go Back 3 Spaces.",
    action: "moveBack",
    value: 3
  },
  {
    id: 9,
    text: "Go to Jail. Go directly to Jail. Do not pass GO, do not collect $200.",
    action: "goToJail",
    value: 0
  },
  {
    id: 10,
    text: "Make general repairs on all your property: For each house pay $25, For each hotel pay $100.",
    action: "repairs",
    value: { house: 25, hotel: 100 }
  },
  {
    id: 11,
    text: "Pay poor tax of $15.",
    action: "pay",
    value: 15
  },
  {
    id: 12,
    text: "Take a trip to Kings Cross Station. If you pass GO, collect $200.",
    action: "move",
    value: 25
  },
  {
    id: 13,
    text: "You have been elected Chairman of the Board. Pay each player $50.",
    action: "payEachPlayer",
    value: 50
  },
  {
    id: 14,
    text: "Your building loan matures. Collect $150.",
    action: "collect",
    value: 150
  },
  {
    id: 15,
    text: "You have won a crossword competition. Collect $100.",
    action: "collect",
    value: 100
  }
];

export const communityChestCards = [
  {
    id: 1,
    text: "Advance to GO. Collect $200.",
    action: "move",
    value: 0
  },
  {
    id: 2,
    text: "Bank error in your favor. Collect $200.",
    action: "collect",
    value: 200
  },
  {
    id: 3,
    text: "Doctor's fee. Pay $50.",
    action: "pay",
    value: 50
  },
  {
    id: 4,
    text: "From sale of stock you get $50.",
    action: "collect",
    value: 50
  },
  {
    id: 5,
    text: "Get Out of Jail Free.",
    action: "getOutOfJail",
    value: 0
  },
  {
    id: 6,
    text: "Go to Jail. Go directly to Jail. Do not pass GO, do not collect $200.",
    action: "goToJail",
    value: 0
  },
  {
    id: 7,
    text: "Grand Opera Night. Collect $50 from every player for opening night seats.",
    action: "collectFromEachPlayer",
    value: 50
  },
  {
    id: 8,
    text: "Holiday Fund matures. Collect $100.",
    action: "collect",
    value: 100
  },
  {
    id: 9,
    text: "Income tax refund. Collect $20.",
    action: "collect",
    value: 20
  },
  {
    id: 10,
    text: "It is your birthday. Collect $10 from every player.",
    action: "collectFromEachPlayer",
    value: 10
  },
  {
    id: 11,
    text: "Life insurance matures. Collect $100.",
    action: "collect",
    value: 100
  },
  {
    id: 12,
    text: "Pay hospital fees of $100.",
    action: "pay",
    value: 100
  },
  {
    id: 13,
    text: "Pay school fees of $150.",
    action: "pay",
    value: 150
  },
  {
    id: 14,
    text: "Receive $25 consultancy fee.",
    action: "collect",
    value: 25
  },
  {
    id: 15,
    text: "You are assessed for street repairs: Pay $40 per house and $115 per hotel you own.",
    action: "repairs",
    value: { house: 40, hotel: 115 }
  },
  {
    id: 16,
    text: "You have won second prize in a beauty contest. Collect $10.",
    action: "collect",
    value: 10
  },
  {
    id: 17,
    text: "You inherit $100.",
    action: "collect",
    value: 100
  }
];
