# How to Setup
1. Clone the repository to any place on your machine
2. Now Configure your `config.json` file
3. Install [PhantomJS](http://phantomjs.org/)
4. Install [Node](https://nodejs.org/)
5. Access the `central-cli` folder and type `sudo npm install`
6. Link `central.sh` to your a folder in your path
7. Make sure `central.sh` has permissions to be executed `chmod +x central.sh`

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

_Shortcuted using `tickets` index from `config.json` and used 2 named arguments_
```
central log communications --spent 1 --date 1
```

_Terminal Output Expected:_
```
Success: Completed Login to Central
Success: Logged time
{ ticket: 37317,
  date: '2015-11-19',
  spent: 1,
  comment: 'Slack Daily Usage',
  activity: 25,
  _ticket: { id: 37317, comment: 'Slack Daily Usage', activity: 25 } }
```


# Settings: `config.json`
Create this file on your `central-cli` folder

```
{
	"username": "your-username",
	"password": "your-password-plain-text",

	"tickets": {
		"communication": {
			"id": 37317,
			"comment": "Slack Daily Usage",
			"activity": 25
		}
	}
}
```
