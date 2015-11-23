# How to Setup
1. Clone the repository to any place on your machine
2. Now Configure your `config.json` file
3. Install [Node](https://nodejs.org/)
4. Access the `central-cli` folder and type `sudo npm install`
5. Link `central.sh` to your a folder in your path
6. Make sure `central.sh` has permissions to be executed `chmod +x central.sh`

```
chmod +x central-cli/central.sh
ln -s central-cli/central.sh /usr/local/bin/central
```


# Using
This was done purely to make the process of logging what I've done easier, so for now we lack more methods.

### Logging Time to a Ticket
**Named Arguments**
* **--date:** If numeric will subtract from today that number of days, if string will be used as date using `moment()`
* **--spent:** Expects a numeric value
* **--comment:** Expects a String describing your activity
* **--activity:** Expects a String with the type of activity or a numeric id
* **--project:** Expects a String with the project name that correllates to an activity id collection in your config.json


_Passing all arguments without names_
```
central log 37317 20-11-2015 1 "My own Slack activity for today" 25 default
```

_Shortcut using `tickets` index from `config.json` and used 2 named arguments_
```
central log communications --spent 1 --date 1
```

_Terminal Output Expected:_
```
Success: Logged time
{ time_entry:
   { created_on: '2015-11-22T04:01:07-08:00',
     spent_on: '2015-11-20',
     issue: { id: 38800 },
     updated_on: '2015-11-22T04:01:07-08:00',
     comments: 'Code Review on Multiple Pull Requests',
     hours: 1.25,
     project: { name: 'Premium Plugins', id: 121 },
     activity: { name: 'Back End Development', id: 445 },
     id: 130670,
     user: { name: 'Gustavo Bordoni', id: 635 } } }
```


# Settings: `config.json`
Create this file on your `central-cli` folder

```
{
	"apiKey": "you API key hash!",

	"tickets": {
		"communication": {
			"id": 37317,
			"comment": "Slack Daily Usage",
			"activity": 25
		},
		"clocking": {
			"id": 31467,
			"comment": "Daily Clocking ;D",
			"activity": 25
		},
		"codereview": {
			"id": 38800,
			"comment": "Code Review on Multiple Pull Requests",
			"activity": 445
		}
	},

	"activity": {
		"backend": 445,
		"design": 208,
		"frontend": 211,
		"management": 374,
		"qa": 212,
		"scrum": 143,
		"strategy": 207,
		"support": 337,
		"internal": 392
	}

}
```
