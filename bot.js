const TelegramBot = require('node-telegram-bot-api');

const octokit = require('./octokit');

// Create a new Telegram bot instance

const bot = new TelegramBot('6229590445:AAGs8G4T_S8D3ojEBMNDef3kJ5E4HqSjj_I', {

  polling: true,

});

// Define the search query

const searchQuery = 'tornadocash notes private crypto tornado phrase backup https';

// Define the search options

const searchOptions = {

  q: searchQuery,

  sort: 'updated',

  order: 'desc',

};

// Define the search interval

const searchInterval = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

// Search for matching repositories every searchInterval milliseconds

setInterval(async () => {

  try {

    // Perform the search query

    const searchResults = await octokit.search.repos(searchOptions);

    // Extract the relevant information from the search results

    const matchingRepos = searchResults.data.items.map((repo) => ({

      name: repo.name,

      url: repo.html_url,

      description: repo.description,

    }));

    // Send a message for each matching repository

    matchingRepos.forEach((repo) => {

      const message = `Found a matching repository!\nName: ${repo.name}\nDescription: ${repo.description}\nURL: ${repo.url}`;

      bot.sendMessage('5563994815', message);

    });

  } catch (error) {

    console.error('Error performing search:', error);

  }

}, searchInterval);
