package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("Database_team03.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		&Gender{},
		&Prefix{},
		&Topic{},
		&Target{},	
		&Soundtrack{},
		&Genre{},
		&Categories{},
		&HasSpoil{},
		&Rating{},
		&SubscribeStatus{},
		&PaymentStatus{},
		&Package{},
		&Subscribe{},
		&User{},
		&Payment{},
		&Report{},
		&Movie{},
		&Review{},
		&History{},
	)
	db = database

}
