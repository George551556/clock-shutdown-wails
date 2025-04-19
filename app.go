package main

import (
	"clock-shutdown-wails/utils"
	"context"
	"fmt"
	"strconv"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) HandlePowerOff(min string) string {
	num, err := strconv.Atoi(min)
	if err != nil {
		fmt.Println("Error:", err.Error())
		return err.Error()
	}
	err = utils.PowerOff(num)
	if err != nil {
		fmt.Println("Error:", err.Error())
		return err.Error()
	}
	return ""
}
