use regex::Regex;
use std::collections::HashMap;
use std::fs::{read_dir, DirEntry, ReadDir};

pub type DirectoryTree = HashMap<Year, MonthlyData>;
type MonthlyData = HashMap<Month, Vec<Date>>;
type DailyData = Vec<Date>;
type Year = String;
type Month = String;
type Date = String;

type ErrorMessage = &'static str;
const ERROR_DIR_NOT_EXISTS: ErrorMessage = "Directory do not exists";

pub fn get_tree(directory: &str) -> Result<DirectoryTree, ErrorMessage> {
    match read_dir(directory) {
        Ok(root_dir) => Ok(parse_root(root_dir)),
        Err(_) => Err(ERROR_DIR_NOT_EXISTS),
    }
}

fn parse_root(root_dir: ReadDir) -> DirectoryTree {
    let regex = Regex::new("[0-9]{4}").unwrap();
    root_dir
        .flatten()
        .filter(|child| child.path().is_dir())
        .filter(|child| regex.is_match(child.file_name().to_str().unwrap()))
        .map(|year| (year.file_name().into_string().unwrap(), parse_year(year)))
        .collect()
}

fn parse_year(year: DirEntry) -> MonthlyData {
    let regex = Regex::new("0[1-9]|1[0-2]").unwrap();
    year.path()
        .read_dir()
        .unwrap()
        .flatten()
        .filter(|child| child.path().is_dir())
        .filter(|child| regex.is_match(child.file_name().to_str().unwrap()))
        .map(|month| (month.file_name().into_string().unwrap(), parse_month(month)))
        .collect()
}

fn parse_month(month: DirEntry) -> DailyData {
    month
        .path()
        .read_dir()
        .unwrap()
        .flatten()
        .filter(|child| child.path().is_file())
        .map(|date| date.file_name().into_string().unwrap())
        .collect()
}
