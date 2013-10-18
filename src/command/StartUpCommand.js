/**
 * 启动命令
 * @author zhoufei
 * @author Copyright(c) 2012-2013 Cn5r, Inc., Some rights reserved.
 * @class StartUpCommand
 * @extends puremvc.MacroCommand
 * @time 2012-3-8 10:00
 */
puremvc.define
    (
        // CLASS INFO
        {
            name:'app.command.StartUpCommand',
            parent:puremvc.MacroCommand
        },

        // INSTANCE MEMBERS	
        {
            /** @override */
            initializeMacroCommand:function () {
                //add the Command- it will register Commands with the Facade
                this.addSubCommand(app.command.PrepControllerCommand);
                this.addSubCommand(app.command.PrepModelCommand);
                this.addSubCommand(app.command.PrepViewCommand);
//                //游戏初始化
//                this.addSubCommand(app.command.InitCommand);
            }
        }
    )