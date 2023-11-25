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
	database, err := gorm.Open(sqlite.Open("team03.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	database.AutoMigrate(
		&StatusUser{},
		&ReportTopic{},
		&Categories{},
		&StatusSub{},
		&Package{},
		&User{},
		&Payment{},
		&Movie{},
		&Report{},
		&UserRating{},
		&UserHistory{},
		&WatchList{},
		&Download{},
	)
	db = database
	statususer := StatusUser{
		StatusName: "user",
	}
	db.Model(&StatusUser{}).Create(&statususer)

	statusadmin := StatusUser{
		StatusName: "admin",
	}
	db.Model(&StatusUser{}).Create(&statusadmin)

	admin01 := User{
		UserName: "admin01",
		Email:    "admin@gmail.com",
		Password: "admin",
		StatusUserID: &statusadmin.ID,
	}
	db.Model(&User{}).Create(&admin01)

	admin02 := User{
		UserName: "admin2",
		Email:    "admin2@gmail.com",
		Password: "admin2",
		StatusUserID: &statusadmin.ID,
	}
	db.Model(&User{}).Create(&admin02)
}
